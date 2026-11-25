FROM node:alpine3.23

WORKDIR /app
COPY package.json .
RUN npm install
COPY src/ ./src/
COPY data/ ./data/
EXPOSE 3000
CMD ["node", "src/index.js"]
