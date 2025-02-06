FROM php:8.1-fpm

# Установка зависимостей
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    supervisor \
    libssl-dev \
    libzip-dev \
    pkg-config \
    libcurl4-openssl-dev \
    libssl-dev \
    postgresql-client

# Установка расширений PHP
RUN docker-php-ext-install pdo_pgsql pdo_mysql bcmath zip

# Установка расширения MongoDB
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Установка Xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Конфигурация Xdebug для HTTP-запросов (но НЕ для CLI)
RUN echo "xdebug.mode=debug" > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Создаем отдельный конфиг для CLI, где Xdebug отключен
RUN echo "xdebug.mode=off" > /usr/local/etc/php/conf.d/99-xdebug-cli.ini

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Создание рабочего каталога
WORKDIR /var/www/html

# Копируем скрипт установки Laravel
COPY install-laravel.sh /usr/local/bin/install-laravel
RUN chmod +x /usr/local/bin/install-laravel

# Настройка прав перед запуском
RUN chown -R www-data:www-data /var/www/html

# Запускаем установку Laravel при первом старте контейнера
CMD ["sh", "-c", "/usr/local/bin/install-laravel && php-fpm"]
