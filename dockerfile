# Imagen base de Node
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --frozen-lockfile

# Copiar el resto de los archivos al contenedor
COPY . .

# Exponer el puerto que usa Vite (por defecto 5173)
EXPOSE 5173

# Comando para ejecutar Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
