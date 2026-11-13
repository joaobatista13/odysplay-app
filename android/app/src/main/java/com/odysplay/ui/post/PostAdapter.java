package com.odysplay.ui.post;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.odysplay.OdysPlayApplication;
import com.odysplay.R;
import com.odysplay.data.model.Post;

import java.util.ArrayList;
import java.util.List;

public class PostAdapter extends RecyclerView.Adapter<PostAdapter.PostViewHolder> {

    private final Context context;
    private List<Post> posts = new ArrayList<>();

    public PostAdapter(Context context) {
        this.context = context;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts != null ? posts : new ArrayList<>();
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public PostViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_post, parent, false);
        return new PostViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PostViewHolder holder, int position) {
        Post post = posts.get(position);

        holder.tvItemAuthorName.setText(post.getAuthorName());
        holder.tvItemProfileType.setText(post.getAuthorRole().name());
        holder.tvItemPostText.setText(post.getContent());
        holder.tvItemLikeCount.setText(String.valueOf(post.getLikesCount()));
        holder.tvItemCommentCount.setText(String.valueOf(post.getComments().size()));
        holder.tvItemPostTime.setText("Recente");

        if (post.isLikedByCurrentUser()) {
            holder.ivItemLikeIcon.setColorFilter(context.getResources().getColor(R.color.noble_gold));
            holder.tvItemLikeCount.setTextColor(context.getResources().getColor(R.color.noble_gold));
        } else {
            holder.ivItemLikeIcon.setColorFilter(context.getResources().getColor(R.color.text_secondary));
            holder.tvItemLikeCount.setTextColor(context.getResources().getColor(R.color.text_secondary));
        }

        // Like button toggle
        holder.btnItemLike.setOnClickListener(v -> {
            OdysPlayApplication.getInstance().getRepository().toggleLike(post.getId());
        });

        // Open detail view
        View.OnClickListener openDetail = v -> {
            Intent intent = new Intent(context, PostDetailActivity.class);
            intent.putExtra(PostDetailActivity.EXTRA_POST_ID, post.getId());
            context.startActivity(intent);
        };

        holder.itemView.setOnClickListener(openDetail);
        holder.btnItemComment.setOnClickListener(openDetail);
    }

    @Override
    public int getItemCount() {
        return posts.size();
    }

    static class PostViewHolder extends RecyclerView.ViewHolder {
        TextView tvItemAuthorName, tvItemProfileType, tvItemPostTime, tvItemPostText, tvItemLikeCount, tvItemCommentCount;
        ImageView ivItemLikeIcon;
        LinearLayout btnItemLike, btnItemComment;

        public PostViewHolder(@NonNull View itemView) {
            super(itemView);
            tvItemAuthorName = itemView.findViewById(R.id.tvItemAuthorName);
            tvItemProfileType = itemView.findViewById(R.id.tvItemProfileType);
            tvItemPostTime = itemView.findViewById(R.id.tvItemPostTime);
            tvItemPostText = itemView.findViewById(R.id.tvItemPostText);
            tvItemLikeCount = itemView.findViewById(R.id.tvItemLikeCount);
            tvItemCommentCount = itemView.findViewById(R.id.tvItemCommentCount);
            ivItemLikeIcon = itemView.findViewById(R.id.ivItemLikeIcon);
            btnItemLike = itemView.findViewById(R.id.btnItemLike);
            btnItemComment = itemView.findViewById(R.id.btnItemComment);
        }
    }
}
