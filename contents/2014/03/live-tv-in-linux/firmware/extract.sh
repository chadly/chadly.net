#!/bin/sh

IFILE2=HVR-12x0-14x0-17x0_1_25_25271_WHQL.zip
# TDA10048 firmware offset a3060 (667744) = firmware offset, length = 24878

IFILE=22xxdrv_27086.zip

SUM=`md5sum $IFILE`
if [ "$SUM" != "af6e64c8c9a2898f4e9223dbbc1d8294  $IFILE" ]
then
	echo "Invalid zip archive $IFILE, either corrupt or incorrect version"
	exit
fi

SUM=`md5sum $IFILE2`
if [ "$SUM" != "7fe395c1a398f079d98e416ee7be3777  $IFILE2" ]
then
	echo "Invalid zip archive $IFILE2, either corrupt or incorrect version"
	exit
fi

echo "Extracting firmware v1.0.2 from $IFILE (windows zip file)"
unzip -jo $IFILE 22xxdrv_27086/Driver89/HcwWiltF.bin
if [ $? -ne 0 ]
then
	echo "Failed to extract file, aborting"
	exit
fi

SUM=`md5sum HcwWiltF.bin`
if [ "$SUM" != "39b8c34dd6e96414798e78540bc5396f  HcwWiltF.bin" ]
then
	echo "Error extracting firmware, failed md5 check"
	exit
else
	mv HcwWiltF.bin v4l-saa7164-1.0.2.fw
	echo "Firmware extracted successfully"
fi

echo "Extracting firmware v1.0.3 from $IFILE (windows zip file)"
unzip -jo $IFILE 22xxdrv_27086/Driver89/HcwWiltF103.bin
if [ $? -ne 0 ]
then
	echo "Failed to extract file, aborting"
	exit
fi

SUM=`md5sum HcwWiltF103.bin`
if [ "$SUM" != "ba8194afd8105969a536cb881899200b  HcwWiltF103.bin" ]
then
	echo "Error extracting firmware, failed md5 check"
	exit
else
	mv HcwWiltF103.bin v4l-saa7164-1.0.3.fw
	echo "HVR22xx Firmware extracted successfully"
fi

echo "Extracting hcw85bda.sys from the windows zip file"
unzip -jo HVR-12x0-14x0-17x0_1_25_25271_WHQL.zip Driver85/hcw85bda.sys
if [ $? -ne 0 ]
then
	echo "Failed to extract file, aborting"
	exit
fi

echo "Extracting firmware as dvb-fe-tda10048-1.0.fw from hcw85bda.sys"
dd if=hcw85bda.sys of=dvb-fe-tda10048-1.0.fw bs=1 skip=667744 count=24878 >/dev/null 2>&1
if [ $? -ne 0 ]
then
	echo "Failed to extract firmware from file, aborting"
	exit
fi

SUM=`md5sum dvb-fe-tda10048-1.0.fw`
if [ "$SUM" != "b9fa8f284483480675d29d19e704f62c  dvb-fe-tda10048-1.0.fw" ]
then
	echo "Error extracting firmware, failed md5 check"
	exit
else
	echo "TDA10048 Firmware extracted successfully"
fi

echo "Now manually copy the firmwares into your firmware dir"
echo "  E.g. sudo cp v4l-saa7164-1.0.2.fw /lib/firmware/`uname -r`"
echo "  E.g. sudo cp v4l-saa7164-1.0.3.fw /lib/firmware/`uname -r`"
echo "  E.g. sudo cp dvb-fe-tda10048-1.0.fw /lib/firmware/`uname -r`"

rm -f hcw85bda.sys

