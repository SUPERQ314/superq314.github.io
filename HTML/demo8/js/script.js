var postFile = {
    init: function () {
        var t = this;
        t.regional = document.getElementById('label');
        t.getImage = document.getElementById('get_image');
        t.editPic = document.getElementById('edit_pic');
        t.coverBox = document.getElementById('cover_box');
        t.picX = 0;     // background image x
        t.picY = 0;     // background image y
        t.editX = 15;   // crop area x
        t.editY = 15;   // crop area y
        t.editW = 100;  // crop area width
        t.editH = 100;  // crop area height

        document
        .getElementById('post_file')
        .addEventListener('change', t.handleFiles, false);

        document.getElementById('save_button').onclick = function () {
            t.editPic.width = t.editW;
            t.editPic.height = t.editH;
            
            var ctx = t.editPic.getContext('2d');
            var images = new Image();
            images.src = t.imgUrl;

            images.onload = function () {
                ctx.drawImage(
                images,
                t.editX,
                t.editY,
                t.editW,
                t.editH,
                0,
                0,
                t.editW,
                t.editH,
                );
                document
                .getElementById('show_pic')
                .getElementsByTagName('img')[0].src = t.editPic.toDataURL();
            };
        };
    },

    handleFiles: function () {
        var fileList = this.files[0];
        var oFReader = new FileReader();
        oFReader.readAsDataURL(fileList);
        oFReader.onload = function (oFREvent) {
            postFile.paintImage(oFREvent.target.result);
        };
    },

    paintImage: function (url) {
        var t = this;
        var createCanvas = t.getImage.getContext('2d');
        var img = new Image();
        img.src = url;
        img.onload = function () {
            if (img.width < t.regional.offsetWidth && img.height < t.regional.offsetHeight) {
                t.imgWidth = img.width;
                t.imgHeight = img.height;
            } else {
                var pWidth = img.width / (img.height / t.regional.offsetHeight);
                var pHeight = img.height / (img.width / t.regional.offsetWidth);
                t.imgWidth = img.width > img.height ? t.regional.offsetWidth : pWidth;
                t.imgHeight = img.height > img.width ? t.regional.offsetHeight : pHeight;
            }
            t.picX = (t.regional.offsetWidth - t.imgWidth) / 2 + 'px';
            t.picY = (t.regional.offsetHeight - t.imgHeight) / 2 + 'px';

            t.getImage.width = t.imgWidth;
            t.getImage.height = t.imgHeight;
            t.getImage.style.left = t.picX;
            t.getImage.style.top = t.picY;

            createCanvas.drawImage(img, 0, 0, t.imgWidth, t.imgHeight);
            t.imgUrl = t.getImage.toDataURL();
            t.cutImage();
            t.drag();
        };
    },

    cutImage: function () {
        var t = this;

        t.coverBox.width = t.imgWidth;
        t.coverBox.height = t.imgHeight;
        t.coverBox.style.display = 'block';
        t.coverBox.style.left = t.picX;
        t.coverBox.style.top = t.picY;

        var cover = t.coverBox.getContext('2d');
        cover.fillStyle = 'rgba(0, 0, 0, 0.5)';
        cover.fillRect(0, 0, t.imgWidth, t.imgHeight);
        cover.clearRect(t.editX, t.editY, t.editH, t.editW);

        document.getElementById('show_edit').style.background = 'url(' + t.imgUrl + ')' + -t.editX + 'px ' + -t.editY + 'px no-repeat';
        document.getElementById('show_edit').style.width = t.editW + 'px';
        document.getElementById('show_edit').style.height = t.editH + 'px';
    },

    drag: function () {
        var t = this;
        var draging = false;
        var startX = 0;
        var startY = 0;

        document.getElementById('cover_box').onmousemove = function (e) {
            var pageX = e.pageX - (t.regional.offsetLeft + this.offsetLeft);
            var pageY = e.pageY - (t.regional.offsetTop + this.offsetTop);

            if (pageX > t.editX && pageX < t.editX + t.editW && pageY > t.editY && pageY < t.editY + t.editH) {
                this.style.cursor = 'move';

                this.onmousedown = function () {
                    draging = true;

                    t.ex = t.editX;
                    t.ey = t.editY;

                    startX = e.pageX - (t.regional.offsetLeft + this.offsetLeft);
                    startY = e.pageY - (t.regional.offsetTop + this.offsetTop);
                };
                window.onmouseup = function () {
                    draging = false;
                };

                if (draging) {
                    if (t.ex + (pageX - startX) < 0) {
                        t.editX = 0;
                    } else if (t.ex + (pageX - startX) + t.editW > t.imgWidth) {
                        t.editX = t.imgWidth - t.editW;
                    } else {
                        t.editX = t.ex + (pageX - startX);
                    }

                    if (t.ey + (pageY - startY) < 0) {
                        t.editY = 0;
                    } else if (t.ey + (pageY - startY) + t.editH > t.imgHeight) {
                        t.editY = t.imgHeight - t.editH;
                    } else {
                        t.editY = t.ey + (pageY - startY);
                    }

                    t.cutImage();
                }
            } else {
                this.style.cursor = 'auto';
            }
        };
    },
};

window.onload = function () {
    postFile.init();
};
  