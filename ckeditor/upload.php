<?php
	$callback = ($_GET['CKEditorFuncNum']); 
	$uploadimg = $_FILES['upload']['name'];
	$imgext = array("jpg","jpeg","gif","png");
	$image_name = pathinfo($uploadimg);
	//print_r($image_name);
	//die();
	$extension = strtolower($image_name['extension']);
	if($uploadimg!="")
	{
		if(in_array($extension, $imgext))
		{
			$imagesize=$_FILES['upload']['size'];
			if (($imagesize>2*1024*1024)||($imagesize==''))
			{
				echo "Image size should be less than 2MB.";
			}
			else
			{
				$new_file_name = strtolower($uploadimg);
				$new_file_name = str_replace(' ', '-', $new_file_name);
				
				
				$absuploadpath = '../../uploads/'; //$_SERVER['DOCUMENT_ROOT'].'/uploads/';
				$check_url = $absuploadpath.$new_file_name;
				if(file_exists($check_url))
				{
					$imgdetails = pathinfo($new_file_name);
					$imgfilename = $imgdetails["filename"];
					$fileextension = $imgdetails['extension'];
					$tymstamp =time();
					$new_file_name =$imgfilename.$tymstamp.".".$fileextension;
				}
				
				$baseurl = 'https://'.$_SERVER['HTTP_HOST'].'/';
				$upload_url = $absuploadpath.$new_file_name;				
				$image_url = $baseurl.'uploads/'.$new_file_name;
				$filetempname = $_FILES['upload']['tmp_name']; 				
				
				$move_file = move_uploaded_file($filetempname,$upload_url);
				$output = '<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction('.$callback.', "'.$image_url .'","");</script>';
				echo $output;
			}

		}
		else
			echo "Please select any jpg, jpeg, png or gif image.";
	}
	else
		echo "Please select an image to upload.";
?>
