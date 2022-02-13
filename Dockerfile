FROM node
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install
CMD npm run build
COPY . .
