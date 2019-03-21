<?php

require_once('c.php');
require_once("$LC_PATH/mod_form.php");

$course_id = required_param('course', PARAM_INT); // Course Module ID
if (!$course_id){
    $module_id = required_param('update', PARAM_INT);
    $module = $DB->get_record('course_modules', array('id' => $module_id), '*', MUST_EXIST);
    $course_id = $module->course;
}

$context = context_system::instance();
require_login();
require_capability('mod/easycastms:view', $context);
$PAGE->set_context($context);
$url = new moodle_url("$LC_PATH/media.php");
$PAGE->set_url($url);

$mform = new mod_easycastms_mod_form();
$mform->display();