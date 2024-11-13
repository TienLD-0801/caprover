# Base image
FROM node:22.11.0 AS base
LABEL maintainer="loivd@dtsmart.vn"

# Install dependencies
FROM base AS packages
WORKDIR /social-chat
COPY package.json yarn.lock ./
RUN yarn cache clean && yarn install

# Build resources
FROM base AS builder
WORKDIR /social-chat
COPY --from=packages /social-chat ./
COPY . .
RUN yarn build

# Final stage with Redis and concurrently
FROM node:22.11.0-alpine AS final
WORKDIR /social-chat

# Install Redis and concurrently for parallel running
RUN apk --update add redis

# Copy output from the builder stage
COPY --from=builder /social-chat/.output ./.output

ARG NUXT_REDIS_HOST
ARG NUXT_REDIS_PORT
ARG NUXT_REDIS_USERNAME
ARG NUXT_REDIS_PASSWORD
ARG NUXT_BE_URL
ARG NUXT_FE_URL
ARG NUXT_API_KEY_PHONE
ARG NUXT_API_KEY_BUSINESS

# Set environment variables
ENV NUXT_REDIS_HOST=${NUXT_REDIS_HOST} \
    NUXT_REDIS_PORT=${NUXT_REDIS_PORT} \
    NUXT_REDIS_USERNAME=${NUXT_REDIS_USERNAME} \
    NUXT_REDIS_PASSWORD=${NUXT_REDIS_PASSWORD} \
    NUXT_BE_URL=${NUXT_BE_URL} \
    NUXT_FE_URL=${NUXT_FE_URL} \
    NUXT_API_KEY_PHONE=${NUXT_API_KEY_PHONE} \
    NUXT_API_KEY_BUSINESS=${NUXT_API_KEY_BUSINESS} 

# Expose the necessary ports
EXPOSE 3000
EXPOSE 6379

# Correct CMD to handle environment variables
CMD ["sh", "-c", "redis-server --bind '0.0.0.0' --requirepass '$NUXT_REDIS_PASSWORD' & sleep 5s && node .output/server/index.mjs"]
