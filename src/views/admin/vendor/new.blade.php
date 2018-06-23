@extends('layouts.app')

@section('title')
    Add Vendor
@endsection

@section('body')

<section class="vbox">
    <section class="scrollable padder">
        <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
            <li><a href="index.html"><i class="fa fa-home"></i> Home</a></li>
            <li class="active">Workset</li>
        </ul>
        <div class="m-b-md">
            <h3 class="m-b-none">Add a Vendor</h3>
        </div>
        <section class="panel panel-default">
            <header class="panel-heading">
                Add Vendor
                <i class="fa fa-info-sign text-muted" data-toggle="tooltip" data-placement="bottom" data-title="ajax to load the data."></i>
            </header>

            <div class="panel-body">
                {!! Form::open(array('route'=>'vendor.store', 'enctype' => 'multipart/form-data')) !!}
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Vendor Name</label>
                            {!! Form::text('vendor_name', '', ['placeholder'=>'Enter vendor name', 'class'=>'form-control input-lg','required']) !!}
                        </div>
                        
                        <div class="form-group">
                            <label>Vendor Details</label>
                            {!! Form::textarea('vendor_email', '', ['placeholder'=>'Enter vendor email', 'class'=>'form-control input-lg','rows'=>'3','required']) !!}
                        </div>
                        <!-- <div class="form-group">
                            <label>Upload Brand image</label>
                            {!! Form::file('image','', ['class'=>'form-control input-lg','required']) !!}
                        </div> -->
                        <div class="form-group">
                            <label>Select Products</label>
                            {!! Form::select('products[]', $products, ['id' => 'products', 'multiple' => 'multiple'] ) !!}
                        </div>
                        <div class="form-group">
                            <label>Select Delivery Locations</label>
                            {!! Form::select('locations[]', $locations, ['id' => 'locations', 'multiple' => 'multiple'] ) !!}
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="line line-dashed line-lg pull-in"></div>
                        {!! Form::submit('Submit', [ 'class'=>'btn btn-default']) !!}
                    </div>
                {!! Form::close() !!}
            </div>

        </section>
    </section>
</section>

@endsection