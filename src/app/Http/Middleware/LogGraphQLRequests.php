<?php
namespace App\Http\Middleware;

use Closure;

class LogGraphQLRequests
{
    public function handle($request, Closure $next)
    {
        // Check if the current request is a POST to the /graphql endpoint
        // Проверяем, что запрос идет на /graphql и имеет метод POST
        if ($request->is('graphql') && $request->isMethod('post')) {
            // Retrieve all request data
            // Получаем все данные запроса
            $data = $request->all();

            // Format the data as a pretty JSON string
            // Форматируем данные в удобочитаемый JSON
            $readableData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

            // Create a log entry with timestamp
            // Добавляем временную метку для удобства
            $logEntry = "=== GraphQL Request at " . now() . " ===\n" . $readableData . "\n\n";

            // Append the log entry to the file in storage/logs
            // Записываем данные в файл storage/logs/graphql_requests.txt
            file_put_contents(storage_path('logs/graphql_requests.txt'), $logEntry, FILE_APPEND);
        }


        // Continue processing the request
        // Передаем запрос дальше
        return $next($request);
    }
}
