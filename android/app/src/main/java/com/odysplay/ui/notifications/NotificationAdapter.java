package com.odysplay.ui.notifications;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.odysplay.R;
import com.odysplay.data.model.NotificationItem;

import java.util.ArrayList;
import java.util.List;

public class NotificationAdapter extends RecyclerView.Adapter<NotificationAdapter.NotificationViewHolder> {

    private List<NotificationItem> notifications = new ArrayList<>();

    public void setNotifications(List<NotificationItem> items) {
        this.notifications = items != null ? items : new ArrayList<>();
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public NotificationViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_notification, parent, false);
        return new NotificationViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NotificationViewHolder holder, int position) {
        NotificationItem item = notifications.get(position);
        holder.tvNotifyTitle.setText(item.getTitle());
        holder.tvNotifyMessage.setText(item.getMessage());
        holder.tvNotifyTime.setText("Recente • " + item.getSeverity().getLabel());

        // Set color bar matching severity
        try {
            int color = Color.parseColor(item.getSeverity().getHexColor());
            holder.viewSeverityBar.setBackgroundColor(color);
        } catch (Exception ignored) {}

        holder.viewUnreadDot.setVisibility(item.isRead() ? View.GONE : View.VISIBLE);
    }

    @Override
    public int getItemCount() {
        return notifications.size();
    }

    static class NotificationViewHolder extends RecyclerView.ViewHolder {
        View viewSeverityBar, viewUnreadDot;
        TextView tvNotifyTitle, tvNotifyMessage, tvNotifyTime;

        public NotificationViewHolder(@NonNull View itemView) {
            super(itemView);
            viewSeverityBar = itemView.findViewById(R.id.viewSeverityBar);
            viewUnreadDot = itemView.findViewById(R.id.viewUnreadDot);
            tvNotifyTitle = itemView.findViewById(R.id.tvNotifyTitle);
            tvNotifyMessage = itemView.findViewById(R.id.tvNotifyMessage);
            tvNotifyTime = itemView.findViewById(R.id.tvNotifyTime);
        }
    }
}
