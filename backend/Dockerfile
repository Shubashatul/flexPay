FROM node:20-slim

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./
COPY .env ./
COPY . ./

# Generate Prisma client
RUN npx prisma generate

CMD ["node", "src/index.js"]
