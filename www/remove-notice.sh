#!/usr/bin/env bash
nohup php ./artisan notice:remove 0 600000 &
nohup php ./artisan notice:remove 600000 1200000 &
nohup php ./artisan notice:remove 1200000 1800000 &
nohup php ./artisan notice:remove 1800000 2400000 &
nohup php ./artisan notice:remove 2400000 3000000 &
nohup php ./artisan notice:remove 3000000 3600000 &
nohup php ./artisan notice:remove 3600000 4200000 &
