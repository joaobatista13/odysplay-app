package com.odysplay.ui.post;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.odysplay.OdysPlayApplication;
import com.odysplay.R;
import com.odysplay.data.model.Comment;
import com.odysplay.data.model.Post;

/**
 * Dedicated Activity for a single post:
 * Displays author information, full body, likes, and comment list + comment submission.
 */
public class PostDetailActivity extends AppCompatActivity {

    public static final String EXTRA_POST_ID = "extra_post_id";

    private Post currentPost;
    private TextView tvAuthorName, tvAuthorBadge, tvPostDate, tvPostContent, tvLikesCount, tvCommentsCount, tvNoComments;
    private Button btnLikePost;
    private ImageButton btnReportPost, btnSubmitComment;
    private EditText etNewComment;
    private RecyclerView rvComments;
    private CommentAdapter commentAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_detail);

        String postId = getIntent().getStringExtra(EXTRA_POST_ID);
        currentPost = OdysPlayApplication.getInstance().getRepository().getPostById(postId);

        initViews();
        bindData();
        setupListeners();
    }

    private void initViews() {
        Toolbar toolbar = findViewById(R.id.toolbarPostDetail);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }
        toolbar.setNavigationOnClickListener(v -> finish());

        tvAuthorName = findViewById(R.id.tvAuthorName);
        tvAuthorBadge = findViewById(R.id.tvAuthorBadge);
        tvPostDate = findViewById(R.id.tvPostDate);
        tvPostContent = findViewById(R.id.tvPostContent);
        tvLikesCount = findViewById(R.id.tvLikesCount);
        tvCommentsCount = findViewById(R.id.tvCommentsCount);
        tvNoComments = findViewById(R.id.tvNoComments);

        btnLikePost = findViewById(R.id.btnLikePost);
        btnReportPost = findViewById(R.id.btnReportPost);
        btnSubmitComment = findViewById(R.id.btnSubmitComment);
        etNewComment = findViewById(R.id.etNewComment);

        rvComments = findViewById(R.id.rvComments);
        rvComments.setLayoutManager(new LinearLayoutManager(this));
        commentAdapter = new CommentAdapter();
        rvComments.setAdapter(commentAdapter);
    }

    private void bindData() {
        if (currentPost == null) {
            finish();
            return;
        }

        tvAuthorName.setText(currentPost.getAuthorName());
        tvAuthorBadge.setText(currentPost.getAuthorRole().getLabel());
        tvPostDate.setText("Recente");
        tvPostContent.setText(currentPost.getContent());
        tvLikesCount.setText(currentPost.getLikesCount() + " curtidas");
        tvCommentsCount.setText(currentPost.getComments().size() + " comentários");

        btnLikePost.setText(currentPost.isLikedByCurrentUser() ? "Curtido" : "Curtir");

        if (currentPost.getComments().isEmpty()) {
            tvNoComments.setVisibility(View.VISIBLE);
        } else {
            tvNoComments.setVisibility(View.GONE);
            commentAdapter.setComments(currentPost.getComments());
        }
    }

    private void setupListeners() {
        btnLikePost.setOnClickListener(v -> {
            OdysPlayApplication.getInstance().getRepository().toggleLike(currentPost.getId());
            currentPost = OdysPlayApplication.getInstance().getRepository().getPostById(currentPost.getId());
            bindData();
        });

        btnSubmitComment.setOnClickListener(v -> {
            String commentText = etNewComment.getText().toString().trim();
            if (commentText.isEmpty()) {
                Toast.makeText(this, "Por favor, digite uma mensagem.", Toast.LENGTH_SHORT).show();
                return;
            }
            OdysPlayApplication.getInstance().getRepository().addComment(currentPost.getId(), commentText);
            etNewComment.setText("");
            currentPost = OdysPlayApplication.getInstance().getRepository().getPostById(currentPost.getId());
            bindData();
            Toast.makeText(this, "Comentário publicado!", Toast.LENGTH_SHORT).show();
        });

        btnReportPost.setOnClickListener(v -> showReportDialog());
    }

    private void showReportDialog() {
        final EditText input = new EditText(this);
        input.setHint("Descreva o motivo da denúncia...");

        new AlertDialog.Builder(this)
                .setTitle("Denunciar Publicação")
                .setMessage("Ajude o OdysPlay a manter a comunidade saudável e respeitosa:")
                .setView(input)
                .setPositiveButton("Enviar", (dialog, which) -> {
                    String reason = input.getText().toString().trim();
                    if (!reason.isEmpty()) {
                        OdysPlayApplication.getInstance().getRepository().submitReport("POST", currentPost.getId(), reason);
                        Toast.makeText(this, "Denúncia registrada para moderação.", Toast.LENGTH_SHORT).show();
                    }
                })
                .setNegativeButton("Cancelar", null)
                .show();
    }
}
