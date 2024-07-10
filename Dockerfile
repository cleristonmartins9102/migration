FROM node:20
WORKDIR /app

COPY package.json ./
COPY .npmrc ./
COPY .env.* ./

RUN mkdir source
COPY tsconfig.json ./source
COPY package.json ./source

COPY src ./source/src
COPY ./.npmrc ./source

RUN cd source && npm run install:dep:dev && npm run build && cp -r ./build/src ../src
COPY permissions.json ./

RUN rm -rf source
RUN npm run install:dep:prod


# COPY cloud-sql-proxy ./cloud-sql-proxy
# RUN apt-get update && apt-get install -y curl && apt install netcat-traditional && \
#     cd cloud-sql-proxy && \
#     curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.11.4/cloud-sql-proxy.linux.amd64 && \
#     chmod +x cloud-sql-proxy && \
#     chmod +x start-proxy.sh

EXPOSE 5050
CMD ["npm", "start"]