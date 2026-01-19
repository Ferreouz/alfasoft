FROM node:18-slim


 RUN apt-get update -y \
 && apt-get install -y openssl default-mysql-client \
 && rm -rf /var/lib/apt/lists/*


WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 8081

CMD ["sh", "-c", "\
echo 'Waiting for MariaDB...'; \
until mysql -h mariadb -u appuser -papppassword -e 'SELECT 1' >/dev/null 2>&1; do \
  sleep 2; \
done; \
echo 'MariaDB is up'; \
npx prisma migrate deploy && \
node dist/server.js"]