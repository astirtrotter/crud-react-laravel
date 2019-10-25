<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public function people()
    {
        return $this->hasMany(Person::class);
    }
}
