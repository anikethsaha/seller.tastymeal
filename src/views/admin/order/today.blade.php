@extends('layouts.app')

@section('title')
    Confirm Orders
@endsection

@section('body')

<section class="vbox">
    <section class="scrollable padder">
        <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
            <li><a href="{{url('/')}}"><i class="fa fa-home"></i> Home</a></li>
            <li class="active">Today's Orders</li>
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
                            <th width="">Bill. No.</th>
                            <th width="">Customer</th>
                            <th width="">Location</th>
                            <!-- <th width="">Email</th> -->
                            <th width="">Amount</th>
                            <th width="">Meal</th>
                            <th width="">Payment</th>
                            <th width="">Menu</th>
                            <th width="">Delivery</th>
                            <th width="">Date</th>
                            <th width="">Delivery Person</th>
                            <th width="150px">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($orders as $order )
                            <tr>
                                <td><i class="fa fa-bullet"></i>&nbsp;{{ $order->id }}</td>
                                <td>{{ $order->name }}</td>
                                <td>{{ $order->address }}</td>
                                <td><i class="fa fa-inr"></i>&nbsp;{{ $order->product->price * $order->quantity }}</td>
                                <td>{{ $order->product->name }}({{ $order->quantity }})</td>

                                <td>{{ $order->payment_option }}</td>
                                <td>Breakfast</td>
                                <td>
                                    @if($order->order_status == 'Dispatched')
                                        Dispatched
                                    @elseif($order->order_status == 'Delivered')
                                        Delivered
                                    @else
                                        Pending
                                    @endif
                                </td>
                                <td>{{ $order->delivery_date }}</td>
                                <td><select>
                                    <option>Delivery Person</option>
                                </select></td>
                            
                                @if($order->order_status == 'Confirmed')
                                    <!-- <td class="text-success"><b style="border: 1px solid; padding: 2px 5px"><a href="{{route('order.confirm', $order->id)}}">{{ $order->order_status }}</a></b></td> -->
                                <td><a href="{{ route('order.cancel',$order->id) }}" class="btn btn-sm btn-icon btn-warning"><i class="fa fa-ban"></i></a></td>

                                @elseif($order->order_status == 'Dispatched')    
                                <td><a href="{{ route('order.cancel',$order->id) }}" class="btn btn-sm btn-icon btn-warning"><i class="fa fa-thumbs-down"></i></a>
                                    <a href="{{ route('order.cancel',$order->id) }}" class="btn btn-sm btn-icon btn-warning"><i class="fa fa-undo"></i></a>
                                </td>

                                @else
                                    <td></td>
                                @endif
                                <!-- <td>
                                    {{ Form::open(['route' => ['order.destroy', $order->id], 'method' => 'delete', 'style'=>'display:inline-block']) }}
                                    <button type="submit" class="btn btn-sm btn-icon btn-danger" onclick="return confirm('Are you sure you want to delete this?')" ><i class="fa fa-trash-o"></i></button>
                                    {{ Form::close() }}
                                    <a href="{{ route('order.edit',$order->id) }}" class="btn btn-sm btn-icon btn-warning"><i class="fa fa-edit"></i></a>
                                    <a href="{{ route('order.show',$order->id) }}" class="btn btn-sm btn-icon btn-success"><i class="fa fa-print"></i></a>
                                </td> -->
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </section>
    </section>
 </section>

@endsection
