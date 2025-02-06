#!/bin/bash

LARAVEL_DIR="/var/www/html"

# Проверяем, установлен ли Laravel
if [ ! -f "$LARAVEL_DIR/artisan" ]; then
    echo "Laravel не найден, выполняем установку..."
    
    # Проверяем, пуст ли каталог
    if [ -z "$(ls -A $LARAVEL_DIR 2>/dev/null)" ]; then
        echo "Каталог пуст, устанавливаем Laravel..."
        
        # Устанавливаем Laravel прямо в /var/www/html
        composer create-project --prefer-dist laravel/laravel "$LARAVEL_DIR"
    else
        echo "Файлы уже существуют, установка Laravel не требуется."
    fi

    # Настройка прав доступа
    chown -R www-data:www-data "$LARAVEL_DIR"
    chmod -R 775 "$LARAVEL_DIR/storage" "$LARAVEL_DIR/bootstrap/cache"

    echo "Laravel успешно установлен в /var/www/html!"
else
    echo "Laravel уже установлен."
fi

exec "$@"
