FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x docker-entrypoint.sh
CMD ["./docker-entrypoint.sh"]
