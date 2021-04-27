# Especificar imagem base primeiro nome do repositorio:tag(versao)
FROM node:alpine

# Definindo diretorio de trabalho dentro do container
WORKDIR /usr/app

#Copiando arquivos do diretorio atual para o diretorio do container
COPY ./ ./
# instalar as dependencias
RUN npm install

#Default command
CMD ["npm","start"]