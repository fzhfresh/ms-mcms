package net.mingsoft.cms.controller;

import net.mingsoft.cms.domain.UserFeedback;
import net.mingsoft.cms.service.UserFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
public class UserFeedbackController {

    @Autowired
    private UserFeedbackService feedbackService;

    @PostMapping("/save")
    public String submitFeedback(@RequestBody UserFeedback feedback) {
        boolean saved = feedbackService.save(feedback);
        return saved ? "反馈提交成功" : "反馈提交失败";
    }

    @GetMapping("/list")
    public List<UserFeedback> getAllFeedbacks() {
        return feedbackService.list();
    }
}