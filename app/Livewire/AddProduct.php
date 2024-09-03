<?php

namespace App\Livewire;
use Livewire\Attributes\Layout;

use Livewire\Component;

class AddProduct extends Component
{
    #[Layout('layouts.app')] 
    public function render()
    {
        return view('livewire.add-product')->layout('layouts.base');
    }
}
