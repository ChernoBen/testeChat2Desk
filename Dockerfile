# Especificar imagem base primeiro nome do repositorio:tag(versao)
FROM node:alpine

#Copiando arquivos do diretorio atual para o diretorio do container
COPY ./ ./
# instalar as dependencias
RUN npm install

#Default command
CMD ["npm","start"]