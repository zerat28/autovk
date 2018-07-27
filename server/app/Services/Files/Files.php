<?php

namespace App\Services\Files;

use ZipArchive;

class Files
{
    private $directories;

    public function __construct($config)
    {
        $this->directories = $config;

    }

    public function upload($request, $path)
    {

        $uploadedFiles = $request->getUploadedFiles();
        $uploadedFile = $uploadedFiles['file'];
        if ($uploadedFile && $uploadedFile->getError() === UPLOAD_ERR_OK) {
            $filename = $this->moveUploadedFile($this->directories[$path], $uploadedFile);
            return $filename;
        }

        return false;
    }

    public function moveUploadedFile($directory, $uploadedFile)
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('%s.%0.8s', $basename, $extension);

        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
    }

    public function remove($filename, $path)
    {
        return unlink($this->directories[$path] . '/' . $filename);
    }

    /**Распаковка архива
     * @param $filename
     * @param $source_path
     * @param $dest_path
     * @param $types
     * @return array|bool|string
     */
    public function unzip($filename, $source_path, $dest_path, $types)
    {

        $za = new ZipArchive();

        $res = $za->open($this->directories[$source_path] . '/' . $filename);

        if ($res) {
            $files = $this->validateZip($za, $types);
        }

        if ($files) {
            try {
                $za->extractTo($this->directories[$dest_path]);
                $za->close();
            } catch (\Exception $e) {
                return $e->getMessage();
            }
        }

        $this->remove($filename, $source_path);

        return $files;
    }

    /**Валидация содержимого архива
     * @param $za
     * @param $types
     * @return array|bool
     */
    public function validateZip($za, $types)
    {
        $files = [];

        for ($i = 0; $i < $za->numFiles; $i++) {
            $legitImage = explode('.', $za->statIndex($i)['name']);
            if (!in_array($legitImage[1], $types)) {
                return false;
            } else {
                $files[$i] = $za->statIndex($i)['name'];
            }
        }

        return $files;
    }
}