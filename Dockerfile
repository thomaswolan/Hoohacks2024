FROM python:latest

WORKDIR /app

# Install Flask and other dependencies
COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY ./backend .

#Install Node.js for building frontend
RUN apt-get update && apt-get install -y nodejs npm

# Install frontend dependencies and build

COPY ./data ./data
COPY ./node_modules ./node_modules
COPY ./public ./public
COPY ./src ./src
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
RUN npm start

#Expose port 5000
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]