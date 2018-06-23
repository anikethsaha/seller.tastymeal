@extends('layouts.app')

@section('title')
    All Orders
@endsection

@section('body')

<section class="vbox">
    <section class="scrollable padder">
        <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
            <li><a href="{{url('/')}}"><i class="fa fa-home"></i> Home</a></li>
            <li class="active">All Orders</li>
        </ul>
        <div class="m-b-md">
            <h3 class="m-b-none">Orders Data</h3>
        </div>
        <section class="panel panel-default">
            <header class="panel-heading">
                All Orders Data
                <i class="fa fa-info-sign text-muted" data-toggle="tooltip" data-placement="bottom" data-title="ajax to load the data."></i>
            </header>
            <div class="table-responsive">
                <table class="table table-striped m-b-none" data-ride="datatables" id="table">
                    <thead>
                        <tr>
                            <th width="">Bill No.</th>
                            <th width="">Customer</th>
                            <th width="">Location</th>
                            <th width="">Amount</th>
                            <th width="">Meal</th>
                            <th width="">Payment</th>
                            <th width="">Status</th>
                            <th width="">Menu</th>
                            <th width="">Delivery</th>
                            <th width="">Date</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($orders as $order )
                            <tr>
                                <td>{{ $order->id }}</td>
                                <td>{{ $order->name }}</td>
                                <td>{{ $order->address }}</td>
                                <td>{{ $order->product->price * $order->quantity }}</td>
                                <td>{{ $order->product->name }}({{$order->quantity}})</td>
                                <td>{{ $order->payment_option }}</td>
                                <td>{{ $order->order_status }}</td>
                                <td> Breakfast</td>
                                <td>
                                    @if($order->status == 'Delivered')
                                        Delivered
                                    @else
                                        Pending
                                    @endif
                                </td>
                                <td>{{ $order->delivery_date}}</td>
                                
                                
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </section>
    </section>
 </section>

@endsection