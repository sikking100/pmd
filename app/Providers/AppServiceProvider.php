<?php

namespace App\Providers;

use App\Models\Banner;
use App\Models\RunningText;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Inertia::share('siteKey', getEnv('NOCAPTCHA_SITEKEY'));
        Inertia::share('tinyKey', getEnv('TINY_MCE_KEY'));
        $announcement = RunningText::all()->first();
        $banner = Banner::all()->first();
        Inertia::share('banner', $banner);
        Inertia::share('announcement', $announcement); 
    }
}
