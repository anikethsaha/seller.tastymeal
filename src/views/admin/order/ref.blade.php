@extends('layouts.app')

@section('title')
    Confirm Orders
@endsection

@section('body')

<section class="vbox">
    <section class="scrollable padder">
        <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
            <li><a href="{{url('/')}}"><i class="fa fa-home"></i> Home</a></li>
            <li class="active">Confirm Orders</li>
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
                            <th width="">Sr. No.</th>
                            <th width="">Name</th>
                            <th width="">Phone</th>
                            <!-- <th width="">Email</th> -->
                            <th width="">Delivery Date</th>
                            <th width="">Meal</th>
                            <th width="">Amount</th>
                            <th width="">Payment</th>
                            <th width="">Status</th>
                            <th width="150px">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($orders as $order )
                            <tr>
                                <td>{{ $order->id }}</td>
                                <td>{{ $order->name }}</td>
                                <td>{{ $order->mobile }}</td>
                                <!-- <td>{{ $order->email }}</td> -->
                                <td>{{ $order->delivery_date }}</td>
                                <td>{{ $order->product->name }}</td>
                                <td>{{ $order->product->price * $order->quantity }}</td>
                                <td>{{ $order->payment_option }}</td>
                                <td>{{ $order->order_status }}</td>
                                @if($order->order_status == 'Unconfirmed')
                                    <td class="text-success"><b style="border: 1px solid; padding: 2px 5px">{{ $order->order_status }}</b></td>
                                @else
                                    <td>--</td>
                                @endif
                                <td>
                                    {{ Form::open(['route' => ['order.destroy', $order->id], 'method' => 'delete', 'style'=>'display:inline-block']) }}
                                    <button type="submit" class="btn btn-sm btn-icon btn-danger" onclick="return confirm('Are you sure you want to delete this?')" ><i class="fa fa-trash-o"></i></button>
                                    {{ Form::close() }}
                                    <a href="{{ route('order.edit',$order->id) }}" class="btn btn-sm btn-icon btn-warning"><i class="fa fa-edit"></i></a>
                                    <a href="{{ route('order.show',$order->id) }}" class="btn btn-sm btn-icon btn-success"><i class="fa fa-print"></i></a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </section>
    </section>
 </section>

@endsection
