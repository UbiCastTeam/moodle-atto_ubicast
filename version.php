<?php

// Spec https://docs.moodle.org/dev/version.php

/**
 * Atto text editor integration version file.
 *
 * @package    atto_easycastms
 * @copyright  2018 UbiCast {@link http://ubicast.eu}
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$plugin->version = 2018122800;
$plugin->requires = 2014051200;
$plugin->cron = 0;
$plugin->component = 'atto_easycastms';
$plugin->maturity = MATURITY_ALPHA; // MATURITY_STABLE;
$plugin->release = '1.0';

$plugin->dependencies = [
    'mod_easycastms' => ANY_VERSION,
];
