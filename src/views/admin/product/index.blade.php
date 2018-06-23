@extends('layouts.app')

@section('title')
    All Product
@endsection

@section('body')

<section class="vbox">
    <section class="scrollable padder">
        <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
            <li><a href="{{url('/')}}"><i class="fa fa-home"></i> Home</a></li>
            <li class="active">Workset</li>
        </ul>
        <div class="m-b-md">
            <h3 class="m-b-none">Product Data</h3>
        </div>
        <section class="panel panel-default">
            <header class="panel-heading">
                All Product Data
                
                <i class="fa fa-info-sign text-muted" data-toggle="tooltip" data-placement="bottom" data-title="ajax to load the data."></i>
            </header>
            <div class="table-responsive">
                <table class="table table-striped m-b-none" data-ride="datatables" id="table">
                    <thead>
                        <tr>
                            <th width="100px">ID</th>
                            <th width="">Product Name</th>
                            <th width="50%">Product Details</th>
                            <th width="">Product Price</th>
                            <th width="70px">Buttons</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($products as $product )
                            <tr>
                                <td>{{ $product->id }}</td>
                                <td>{{ $product->name }}</td>
                                <td>{{ $product->description }}</td>
                                <td>{{ $product->price }}</td>
                                <td>
                                    {{ Form::open(['route' => ['product.destroy', $product->id], 'method' => 'delete', 'style'=>'display:inline-block']) }}
                                        <button type="submit" class="btn btn-sm btn-icon btn-danger" onclick="return confirm('Are you sure you want to delete this?')" ><i class="fa fa-trash-o"></i></button>
                                    {{ Form::close() }}
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