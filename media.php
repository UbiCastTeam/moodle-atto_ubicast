<?php

require_once('c.php');
require_once("$LC_PATH/mod_form.php");

$context = context_system::instance();
require_login();
require_capability('mod/ubicast:view', $context);
$PAGE->set_context($context);
$url = new moodle_url("$LC_PATH/media.php");
$PAGE->set_url($url);

$mform = new mod_ubicast_mod_form();
$mform->display();