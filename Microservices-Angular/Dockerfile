FROM node:alpine AS builder

RUN mkdir -p /app

COPY package.json /app

RUN sleep 5s

WORKDIR /app

COPY . .

RUN npm install 

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html/



