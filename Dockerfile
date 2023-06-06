FROM chekote/node:14.17.0-alpine AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
# Copy app files
COPY . .
# Build the app
RUN yarn build

# Run the image as a non-root user
RUN adduser -D mary
USER mary

# Bundle static assets with nginx
FROM v8fg/nginx:1.20.0-alpine as production
ENV NODE_ENV production
ENV REACT_APP_REQUEST_OPTIONS_HOST="igrow-api.fly.dev"
ENV REACT_APP_REQUEST_OPTIONS_PORT="443"
ENV REACT_APP_REQUEST_OPTIONS_HTTP_PROTOCOL="https"

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
ENV PORT 8080
EXPOSE 8080
# Start nginx
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

