import { type UseFetchOptions } from '#app';
import type { ApiResponse } from '~/types/apiResponse';

export const useFetchCustom = <T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
): {
  data: Ref<T | null>;
  error: Ref<string | null>;
  loading: Ref<boolean>;
  fetchData: () => Promise<void>;
} => {
  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref<string | null>(null);
  const loading = ref<boolean>(true);

  const fetchData = async () => {
    const config = useRuntimeConfig();
    try {
      const { result } = await $fetch<ApiResponse<T>>(
        config.BE_URL + (typeof url === 'function' ? url() : url),
        {
          ...(options as any),
        }
      );

      if (result?.status === 'FAIL') {
        throw new Error(`API Error: ${result?.status}`);
      }

      data.value = result?.data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'An unexpected error occurred';
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetchData };
};
