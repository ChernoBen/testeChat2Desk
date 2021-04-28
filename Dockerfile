# Especificar imagem base primeiro nome do repositorio:tag(versao)
FROM node:alpine

# Definindo diretorio de trabalho dentro do container
WORKDIR /usr/app

#Copiando arquivos do diretorio atual para o diretorio do container
COPY ./package.json ./

# instalar as dependencias
RUN npm install

COPY ./ ./
CMD ["npx","knex migrate:latest"]  

#Default command
CMD ["npm","start"]