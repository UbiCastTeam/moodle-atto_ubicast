<?php

// Spec https://docs.moodle.org/dev/version.php

/**
 * Atto text editor integration version file.
 *
 * @package    atto_ubicast
 * @copyright  2019 UbiCast {@link https://www.ubicast.eu}
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die('Direct access to this script is forbidden.');

$plugin->version = 2019040200;
$plugin->requires = 2015111610; // 3.0
$plugin->component = 'atto_ubicast';
$plugin->release = '1.0';
$plugin->maturity = MATURITY_STABLE;
$plugin->cron = 0;

$plugin->dependencies = [
    'mod_ubicast' => 2019040200,
];
