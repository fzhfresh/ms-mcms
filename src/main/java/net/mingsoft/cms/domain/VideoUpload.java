package net.mingsoft.cms.domain;

import lombok.Data;

//视频数据库实体类
@Data
public class VideoUpload {
    private int id;
    /**
     * 视频名称
     */
    private String videoName;
    /**
     * 视频路径
     */
    private String videoUrl;
    /**
     * UUID
     */
    private String videoUUID;
    /**
     * 金额
     */
    private String amount;
    /**
     * 标题
     */
    private String title;
    /**
     * 描述
     */
    private String content;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getVideoUUID() {
        return videoUUID;
    }

    public void setVideoUUID(String videoUUID) {
        this.videoUUID = videoUUID;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
