FROM node:slim

COPY . .

RUN apt-get update -y
RUN apt-get install -y openssl

RUN npm install
RUN cp .env.example .env
RUN npx prisma migrate dev --name init
RUN npm run build

CMD ["node", "build/index.js"]
