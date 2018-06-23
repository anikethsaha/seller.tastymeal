@extends('layouts.app')

@section('title')
    All Orders
@endsection

@section('body')

<section class="vbox">
    <section class="scrollable padder">
        <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
            <li><a href="{{url('/')}}"><i class="fa fa-home"></i> Home</a></li>
            <li class="active">Dispatch Orders</li>
        </ul>
        <div class="m-b-md">
            <h3 class="m-b-none">Dispatch Orders</h3>
        </div>
        <section class="panel panel-default">
            <header class="panel-heading">
                Prepared Food
                <i class="fa fa-info-sign text-muted" data-toggle="tooltip" data-placement="bottom" data-title="ajax to load the data."></i>
            </header>
            <div class="prepared-food">
                @foreach($orders as $order)
                    
                @endforeach
            </div>
            
        </section>
    </section>
 </section>

@endsection