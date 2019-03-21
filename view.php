<?php

require_once('c.php');
require_once("$EC_PATH/locallib.php");
$course_id = required_param('course', PARAM_TEXT);
$video_id = required_param('video', PARAM_TEXT);

$context = context_system::instance();
require_login();
require_capability('mod/easycastms:view', $context);
$PAGE->set_context($context);

$config = get_config('easycastms');
$tool_base_URL = $config->easycastms_url;
$url = "$tool_base_URL/lti/$video_id/";
$course = $DB->get_record('course', array('id' => $course_id), '*', MUST_EXIST);

easycastms_launch_tool($course, null, $video_id); // echo inside function
