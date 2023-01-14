FROM node:lts-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
RUN npm install -g serve
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["serve", "-s", "build"]