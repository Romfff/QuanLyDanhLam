<?php
namespace App\Exceptions;
class GioiThieuException extends \RuntimeException
{
    public function __construct(public string $ma, string $message, public int $status = 422)
    {
        parent::__construct($message);
    }
}