FROM node:slim

COPY . .

RUN npm install
RUN cp .env.example .env
RUN npx prisma migrate dev --name init
RUN npm run build

CMD ["node", "build/index.js"]
