<template>
    <div>
        <div class="page-content">
        <div class="container-fluid">
            <header class="section-header">
                <div class="tbl">
                    <div class="tbl-row">
                        <div class="tbl-cell">
                            <h3>Basic Inputs</h3>
                            <ol class="breadcrumb breadcrumb-simple">
                                <li><a href="#">StartUI</a></li>
                                <li><a href="#">Forms</a></li>
                                <li class="active">Basic Inputs</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </header>

            <div class="box-typical box-typical-padding">
                <p>
                    Examples of standard form controls supported in an example form layout. Individual form controls automatically receive some global styling. All textual <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code>, and <code>&lt;select&gt</code>; elements with <code>.form-control</code> are set to <code>width: 100%;</code> by default. Wrap labels and controls in <code>.form-group</code> for optimum spacing. Labels in horizontal form require <code>.control-label</code> class.
                </p>

                <h5 class="m-t-lg with-border">Horizontal Inputs</h5>

                <form>
                    <div class="form-group row">
                        <label class="col-sm-2 form-control-label">Text</label>
                        <div class="col-sm-10">
                            <p class="form-control-static"><input type="text" class="form-control" id="inputPassword" placeholder="Text"></p>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 form-control-label">Text Disabled</label>
                        <div class="col-sm-10">
                            <p class="form-control-static"><input type="text" disabled class="form-control" id="inputPassword" placeholder="Text Disabled"></p>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 form-control-label">Text Readonly</label>
                        <div class="col-sm-10">
                            <p class="form-control-static"><input type="text" readonly class="form-control" id="inputPassword" placeholder="Text Readonly"></p>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 form-control-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleSelect" class="col-sm-2 form-control-label">Select</label>
                        <div class="col-sm-10">
                            <select id="exampleSelect" class="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleSelect2" class="col-sm-2 form-control-label">Multiple select</label>
                        <div class="col-sm-10">
                            <select multiple class="form-control" id="exampleSelect2">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleSelect" class="col-sm-2 form-control-label">Textarea</label>
                        <div class="col-sm-10">
                            <textarea rows="4" class="form-control" placeholder="Textarea"></textarea>
                        </div>
                    </div>
                </form>

                <h5 class="m-t-lg with-border">Vertical Inputs</h5>

                <div class="row">
                    <div class="col-lg-4">
                        <fieldset class="form-group">
                            <label class="form-label semibold" for="exampleInput">First Name</label>
                            <input type="text" class="form-control" id="exampleInput" placeholder="First Name">
                            <small class="text-muted">We'll never share your email with anyone else.</small>
                        </fieldset>
                    </div>
                    <div class="col-lg-4">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" value="mail@mail.com">
                        </fieldset>
                    </div>
                    <div class="col-lg-4">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                        </fieldset>
                    </div>
                </div><!--.row-->


                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputDisabled">Disabled</label>
                            <input type="email" class="form-control" id="exampleInputDisabled" placeholder="First Name" disabled>
                        </fieldset>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputDisabled2">Readonly</label>
                            <input type="password" readonly class="form-control" id="exampleInputDisabled2">
                        </fieldset>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <fieldset class="form-group">
                            <label class="form-label" for="exampleInputError">Error</label>
                            <input type="text" class="form-control form-control-error" id="exampleInputError" placeholder="First Name" value="First Name">
                        </fieldset>
                    </div>
                </div><!--.row-->

                <h5 class="m-t-lg with-border">Dropdown &amp; Icons</h5>

                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <div class="form-group input-group">
                            <input type="text" class="form-control" aria-label="Text input with dropdown button">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-secondary-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Action
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                    <div role="separator" class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Separated link</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="form-group">
                            <div class="input-group">
                                <input type="text" class="form-control" aria-label="Text input with dropdown button">
                                <div class="input-group-btn">
                                    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Action
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                        <div role="separator" class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Separated link</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!--.row-->

                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">$</div>
                                <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
                                <div class="input-group-addon">.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">http://example.com/users/</div>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                </div><!--.row-->

                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                </div>
                                <input type="text" class="form-control" placeholder="Amount">
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-text-color" aria-hidden="true"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-earphone"></span>
                                </div>
                                <input type="text" class="form-control" placeholder="Amount">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="form-group">
                            <div class="input-group">
                                <input type="text" class="form-control">
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-send"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!--.row-->
                <div class="row">
                    <div class="col-sm-12">
                        <textarea rows="4" class="form-control" placeholder="Textarea"></textarea>
                    </div>
                </div><!--.row-->

                <h5 class="m-t-lg with-border">Custom Validation Styles</h5>

                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <fieldset class="form-group form-group-error">
                            <label class="form-label" for="exampleError">Username</label>
                            <input type="text" class="form-control" id="exampleError">
                            <small class="text-muted">Username must not be empty</small>
                        </fieldset>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <fieldset class="form-group form-group-error">
                            <label class="form-label" for="exampleError2">Username</label>
                            <div class="form-control-wrapper">
                                <input type="text" class="form-control" id="exampleError2">
                                <div class="form-tooltip-error">Username must be between 6 and 18 characters. No special characters allowed.</div>
                            </div>
                            <small class="text-muted">Username must not be empty</small>
                        </fieldset>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <fieldset class="form-group form-group-error">
                            <label class="form-label" for="exampleError3">Password</label>
                            <div class="form-control-wrapper">
                                <input type="text" class="form-control" id="exampleError3">
                                <div class="form-tooltip-error sm">Password must be at least 6 characters</div>
                            </div>
                            <small class="text-muted">Password must not be empty</small>
                        </fieldset>
                    </div>
                </div><!--.row-->

                <h5 class="m-t-lg with-border">TouchSpin</h5>

                <div class="row">
                    <div class="col-lg-3">
                        <div class="form-group">
                            <input id="demo1" type="text" value="55" name="demo1">
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <input id="demo2" type="text" value="0" name="demo2" class="col-md-8 form-control">
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <input id="demo_vertical" type="text" value="" name="demo_vertical">
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <input id="demo_vertical2" type="text" value="" name="demo_vertical2">
                        </div>
                    </div>
                </div><!--.row-->
                <div class="row">
                    <div class="col-lg-3">
                        <div class="form-group">
                            <input id="demo3" type="text" value="" name="demo3">
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <input id="demo4" type="text" value="" name="demo4" class="input-sm">
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <div class="input-group input-group-lg">
                                <input id="demo4_2" type="text" value="" name="demo4_2" class="form-control input-lg">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <input id="demo6" type="text" value="" name="demo6">
                        </div>
                    </div>
                </div><!--.row-->
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <div class="input-group">
                                <input id="demo5" type="text" class="form-control" name="demo5" value="50">
                                <div class="input-group-btn">
                                    <button type="button" class="btn btn-secondary">Action</button>
                                    <button type="button" class="btn dropdown-toggle btn-secondary" data-toggle="dropdown">
                                        <span class="caret"></span>
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <ul class="dropdown-menu pull-right" role="menu">
                                        <li><a href="#">Action</a></li>
                                        <li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">Separated link</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!--.row-->

                <h5 class="m-t-lg with-border">Icons</h5>

                <div class="row">
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Left Icon:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control" placeholder="Left"/>
                                <i class="font-icon font-icon-pin"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Right Icon:</label>
                            <div class="form-control-wrapper form-control-icon-right">
                                <input type="text" class="form-control" placeholder="Right"/>
                                <i class="font-icon font-icon-github"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Left Glyphicon:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control" placeholder="Left"/>
                                <i class="glyphicon glyphicon-heart"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Right Glyphicon:</label>
                            <div class="form-control-wrapper form-control-icon-right">
                                <input type="text" class="form-control" placeholder="Right"/>
                                <i class="glyphicon glyphicon-magnet"></i>
                            </div>
                        </div>
                    </div>
                </div><!--.row-->
                <div class="row">
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Left Font Awesome:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control" placeholder="Left"/>
                                <i class="fa fa-youtube-play"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Right Font Awesome:</label>
                            <div class="form-control-wrapper form-control-icon-right">
                                <input type="text" class="form-control" placeholder="Right"/>
                                <i class="fa fa-mail-forward"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Blue Icon:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control" placeholder="Left"/>
                                <i class="font-icon font-icon-comments color-blue"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Green Icon:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control" placeholder="Left"/>
                                <i class="font-icon font-icon-check-bird color-green"></i>
                            </div>
                        </div>
                    </div>
                </div><!--.row-->
                <div class="row">
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Red Icon:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control" placeholder="Left"/>
                                <i class="font-icon font-icon-close-2 color-red"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Green Icon:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control" placeholder="Left"/>
                                <i class="font-icon font-icon-clock color-orange"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Purple Icon:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control" placeholder="Left"/>
                                <i class="font-icon font-icon-earth color-purple"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Dark Icon:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control" placeholder="Left"/>
                                <i class="font-icon font-icon-i-circle color-black-blue"></i>
                            </div>
                        </div>
                    </div>
                </div><!--.row-->
                <div class="row">
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Left Large:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control form-control-lg" placeholder="Left"/>
                                <i class="font-icon font-icon-page"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Right Large:</label>
                            <div class="form-control-wrapper form-control-icon-right">
                                <input type="text" class="form-control form-control-lg" placeholder="Right"/>
                                <i class="font-icon font-icon-cam-video"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Left Small:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control form-control-sm" placeholder="Left"/>
                                <i class="font-icon font-icon-picture"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Right Small:</label>
                            <div class="form-control-wrapper form-control-icon-right">
                                <input type="text" class="form-control form-control-sm" placeholder="Right"/>
                                <i class="font-icon font-icon-pencil"></i>
                            </div>
                        </div>
                    </div>
                </div><!--.row-->
                <div class="row">
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Left Rounded:</label>
                            <div class="form-control-wrapper form-control-icon-left">
                                <input type="text" class="form-control form-control-rounded" placeholder="Left"/>
                                <i class="font-icon font-icon-dropbox"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <label class="form-label semibold">Right Rounded:</label>
                            <div class="form-control-wrapper form-control-icon-right">
                                <input type="text" class="form-control form-control-rounded" placeholder="Right"/>
                                <i class="font-icon font-icon-cam-photo"></i>
                            </div>
                        </div>
                    </div>
                </div><!--.row-->

                <h5 class="m-t-lg with-border">Validation</h5>

                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group has-success">
                            <label class="form-label" for="inputSuccess1">Input with success</label>
                            <input type="text" class="form-control form-control-success" id="inputSuccess1">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group has-warning">
                            <label class="form-label" for="inputWarning1">Input with warning</label>
                            <input type="text" class="form-control form-control-warning" id="inputWarning1">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group has-danger">
                            <label class="form-label" for="inputDanger1">Input with danger</label>
                            <input type="text" class="form-control form-control-danger" id="inputDanger1">
                        </div>
                    </div>
                </div><!--.row-->
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-blue-fill">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-red-fill">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-orange-fill">
                        </div>
                    </div>
                </div><!--.row-->
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-green-fill">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-purple-fill">
                        </div>
                    </div>
                </div><!--.row-->

            </div><!--.box-typical-->
        </div><!--.container-fluid-->
    </div><!--.page-content-->
        <div class="page-content">
        <div class="container-fluid">
            <header class="section-header">
                <div class="tbl">
                    <h3>Buttons</h3>
                    <ol class="breadcrumb breadcrumb-simple">
                        <li><a href="#">StartUI</a></li>
                        <li><a href="#">Forms</a></li>
                        <li class="active">Buttons</li>
                    </ol>
                </div>
            </header>

            <section class="card">
                <div class="card-block">
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 class="m-t-lg with-border m-t-0">Default buttons</h5>

                            <div class="form-group">
                                <button type="button" class="btn btn-inline">Button</button>
                                <button type="button" class="btn btn-inline" disabled>Button disabled</button>
                                <a href="#" class="btn btn-inline">Link</a>
                                <a href="#" class="btn btn-inline disabled">Link disabled</a>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-inline btn-primary">Primary</button>
                                <button type="button" class="btn btn-inline btn-secondary">Secondary</button>
                                <button type="button" class="btn btn-inline btn-success">Success</button>
                                <button type="button" class="btn btn-inline btn-info">Info</button>
                                <button type="button" class="btn btn-inline btn-warning">Warning</button>
                                <button type="button" class="btn btn-inline btn-danger">Danger</button>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-inline btn-primary-outline">Primary</button>
                                <button type="button" class="btn btn-inline btn-secondary-outline">Secondary</button>
                                <button type="button" class="btn btn-inline btn-success-outline">Success</button>
                                <button type="button" class="btn btn-inline btn-info-outline">Info</button>
                                <button type="button" class="btn btn-inline btn-warning-outline">Warning</button>
                                <button type="button" class="btn btn-inline btn-danger-outline">Danger</button>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <h5 class="m-t-lg with-border m-t-0">Rounded buttons</h5>

                            <div class="form-group">
                                <button type="button" class="btn btn-rounded btn-inline">Button rounded</button>
                                <button type="button" class="btn btn-rounded btn-inline" disabled>Button rounded disabled</button>
                                <a href="#" class="btn btn-rounded btn-inline">Link rounded</a>
                                <a href="#" class="btn btn-rounded btn-inline disabled">Link rounded disabled</a>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-rounded btn-inline btn-primary">Primary</button>
                                <button type="button" class="btn btn-rounded btn-inline btn-secondary">Secondary</button>
                                <button type="button" class="btn btn-rounded btn-inline btn-success">Success</button>
                                <button type="button" class="btn btn-rounded btn-inline btn-info">Info</button>
                                <button type="button" class="btn btn-rounded btn-inline btn-warning">Warning</button>
                                <button type="button" class="btn btn-rounded btn-inline btn-danger">Danger</button>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-rounded btn-inline btn-primary-outline">Primary</button>
                                <button type="button" class="btn btn-rounded btn-inline btn-secondary-outline">Secondary</button>
                                <button type="button" class="btn btn-rounded btn-inline btn-success-outline">Success</button>
                                <button type="button" class="btn btn-rounded btn-inline btn-info-outline">Info</button>
                                <button type="button" class="btn btn-rounded btn-inline btn-warning-outline">Warning</button>
                                <button type="button" class="btn btn-rounded btn-inline btn-danger-outline">Danger</button>
                            </div>
                        </div>
                    </div><!--.row-->

                    <h5 class="with-border m-t-lg">Lists</h5>

                    <div class="row">
                        <div class="col-sm-12">
                            <ul class="nav nav-pills">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">All</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="#">Recent</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Weakest</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Strongest</a>
                                </li>
                            </ul>
                        </div>
                    </div><!--.row-->

                    <h5 class="with-border m-t-lg">Dropdown</h5>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="btn-group">
                                <button type="button" class="btn btn-inline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Action
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Separated link</a>
                                </div>
                            </div>
                            <div class="btn-group dropup">
                                <button type="button" class="btn btn-inline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropup
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Separated link</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="dropdown">
                                <button class="btn btn-inline dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                    </div><!--.row-->

                    <h5 class="with-border m-t-lg">Buttons group</h5>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-secondary-outline">Left</button>
                                    <button type="button" class="btn btn-secondary-outline">Middle</button>
                                    <button type="button" class="btn btn-secondary-outline">Right</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                    <div class="btn-group" role="group" aria-label="First group">
                                        <button type="button" class="btn btn-secondary-outline">1</button>
                                        <button type="button" class="btn btn-secondary-outline">2</button>
                                        <button type="button" class="btn btn-secondary-outline">3</button>
                                        <button type="button" class="btn btn-secondary-outline">4</button>
                                    </div>
                                    <div class="btn-group" role="group" aria-label="Second group">
                                        <button type="button" class="btn btn-secondary-outline">5</button>
                                        <button type="button" class="btn btn-secondary-outline">6</button>
                                        <button type="button" class="btn btn-secondary-outline">7</button>
                                    </div>
                                    <div class="btn-group" role="group" aria-label="Third group">
                                        <button type="button" class="btn btn-secondary-outline">8</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!--.row-->

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-secondary-outline">Left</button>
                                    <button type="button" class="btn btn-secondary-outline">Middle</button>
                                    <button type="button" class="btn btn-secondary-outline">Right</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-secondary-outline">Left</button>
                                    <button type="button" class="btn btn-secondary-outline">Middle</button>
                                    <button type="button" class="btn btn-secondary-outline">Right</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-secondary-outline">Left</button>
                                    <button type="button" class="btn btn-secondary-outline">Middle</button>
                                    <button type="button" class="btn btn-secondary-outline">Right</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                    <button type="button" class="btn btn-secondary-outline">1</button>
                                    <button type="button" class="btn btn-secondary-outline">2</button>

                                    <div class="btn-group" role="group">
                                        <button id="btnGroupDrop1" type="button" class="btn btn-secondary-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Dropdown
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                            <a class="dropdown-item" href="#">Dropdown link</a>
                                            <a class="dropdown-item" href="#">Dropdown link</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-secondary-outline">Action</button>
                                    <button type="button" class="btn btn-secondary-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Separated link</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!--.row-->

                    <h5 class="with-border m-t-lg">Context menu</h5>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <button class="context-menu-one btn btn-primary">Default, right click me</button>
                                <button class="context-menu-submenus btn btn-primary">Submenu, right click me</button>
                            </div>
                        </div>
                    </div>

                    <h5 class="with-border m-t-lg">Ladda buttons</h5>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <button class="btn btn-inline btn-primary ladda-button" data-style="expand-left"><span class="ladda-label">expand-left</span></button>

                                <button class="btn btn-inline btn-primary ladda-button" data-style="expand-right"><span class="ladda-label">expand-right</span></button>

                                <button class="btn btn-inline btn-primary ladda-button" data-style="expand-up"><span class="ladda-label">expand-up</span></button>

                                <button class="btn btn-inline btn-primary ladda-button" data-style="expand-down"><span class="ladda-label">expand-down</span></button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <button class="btn btn-inline btn-info ladda-button" data-style="zoom-in"><span class="ladda-label">zoom-in</span></button>

                                <button class="btn btn-inline btn-info ladda-button" data-style="zoom-out"><span class="ladda-label">zoom-out</span></button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <button class="btn btn-inline btn-warning ladda-button" data-style="slide-left"><span class="ladda-label">slide-left</span></button>

                                <button class="btn btn-inline btn-warning ladda-button" data-style="slide-right"><span class="ladda-label">slide-right</span></button>

                                <button class="btn btn-inline btn-warning ladda-button" data-style="slide-up"><span class="ladda-label">slide-up</span></button>

                                <button class="btn btn-inline btn-warning ladda-button" data-style="slide-down"><span class="ladda-label">slide-down</span></button>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-inline btn-warning ladda-button" data-style="contract"><span class="ladda-label">contract</span></button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 progress-demo">
                            <h6>Built-in progress bar</h6>
                            <div class="form-group">
                                <button class="btn btn-inline btn-danger ladda-button" data-style="expand-right"><span class="ladda-label">expand-right</span></button>

                                <button class="btn btn-inline btn-danger ladda-button" data-style="expand-left"><span class="ladda-label">expand-left</span></button>

                                <button class="btn btn-inline btn-danger ladda-button" data-style="contract"><span class="ladda-label">contract</span></button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h6>Sizes</h6>
                            <div class="form-group">
                                <button class="btn btn-inline btn-primary btn-lg ladda-button" data-style="expand-right" data-size="l"><span class="ladda-label">large</span></button>

                                <button class="btn btn-inline btn-primary ladda-button" data-style="expand-right" data-size="xs"><span class="ladda-label">standart</span></button>

                                <button class="btn btn-inline btn-primary btn-sm ladda-button" data-style="expand-right" data-size="s"><span class="ladda-label">small</span></button>
                            </div>
                        </div>
                    </div>

                    <h5 class="with-border m-t-lg">Font Awesome Styled Buttons</h5>

                    <div class="row">
                        <div class="col-sm-12">
                            <button type="button" class="btn-square-icon">
                                <i class="fa fa-users"></i>
                                Users
                                <span class="label label-pill label-danger">2</span>
                            </button>
                            <a href="#" class="btn-square-icon">
                                <i class="fa fa-calendar"></i>
                                Calendar
                                <span class="label label-pill label-primary">124</span>
                            </a>
                            <button type="button" class="btn-square-icon">
                                <i class="fa fa-shopping-cart"></i>
                                Cart
                            </button>
                            <button type="button" class="btn-square-icon">
                                <i class="fa fa-comment"></i>
                                Comments
                                <span class="label label-pill label-info">5</span>
                            </button>
                            <button type="button" class="btn-square-icon">
                                <i class="fa fa-mail-forward"></i>
                                Messages
                                <span class="label label-pill label-success">11</span>
                            </button>
                            <button type="button" class="btn-square-icon">
                                <i class="fa fa-bell"></i>
                                Alarm
                                <span class="label label-pill label-warning">5</span>
                            </button>
                        </div>
                        <div class="col-sm-12">
                            <button type="button" class="btn-square-icon btn-square-icon-rounded">
                                <i class="fa fa-users"></i>
                                Users
                                <span class="label label-pill label-danger">2</span>
                            </button>
                            <a href="#" class="btn-square-icon">
                                <i class="fa fa-calendar"></i>
                                Calendar
                                <span class="label label-pill label-primary">124</span>
                            </a>
                            <button type="button" class="btn-square-icon btn-square-icon-rounded">
                                <i class="fa fa-shopping-cart"></i>
                                Cart
                            </button>
                            <button type="button" class="btn-square-icon btn-square-icon-rounded">
                                <i class="fa fa-comment"></i>
                                Comments
                                <span class="label label-pill label-info">5</span>
                            </button>
                            <button type="button" class="btn-square-icon btn-square-icon-rounded">
                                <i class="fa fa-mail-forward"></i>
                                Messages
                                <span class="label label-pill label-success">11</span>
                            </button>
                            <button type="button" class="btn-square-icon btn-square-icon-rounded">
                                <i class="fa fa-bell"></i>
                                Alarm
                                <span class="label label-pill label-warning">5</span>
                            </button>
                        </div>
                    </div><!--.row-->

                </div>
            </section>
        </div><!--.container-fluid-->
    </div><!--.page-content-->
    </div>
</template>
<script>
    export default {
        name: 'Form'
    }
</script>
