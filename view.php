<?php

require_once('c.php');
require_once("$EC_PATH/locallib.php");
$course_id = required_param('course', PARAM_TEXT);
$video_id = required_param('video', PARAM_TEXT);

$context = context_system::instance();
require_login();
require_capability('mod/ubicast:view', $context);
$PAGE->set_context($context);

$config = get_config('ubicast');
$tool_base_URL = $config->ubicast_url;
$url = "$tool_base_URL/lti/$video_id/";
$course = $DB->get_record('course', array('id' => $course_id), '*', MUST_EXIST);

ubicast_launch_tool($course, null, $video_id); // echo inside function
