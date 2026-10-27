import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ActivityItem from '../components/ActivityItem';
import { useTheme } from '../context/ThemeContext';
import { INITIAL_ACTIVITIES, ACTIVITY_CATEGORIES } from '../data/activities';

export default function ActivityScreen() {
  const { colors, isDark } = useTheme();

  // Local state danh sách hoạt động
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  // Tương tác cập nhật trạng thái bất biến (immutable)
  const handleToggleJoin = (id) => {
    setActivities((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isJoined: !item.isJoined } : item
      )
    );
  };

  // Lọc danh sách theo Category và Từ khóa tìm kiếm
  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      const matchCategory =
        selectedCategory === 'Tất cả' || item.category === selectedCategory;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [activities, selectedCategory, searchQuery]);

  // Thống kê số lượng đã tham gia
  const joinedCount = useMemo(
    () => activities.filter((act) => act.isJoined).length,
    [activities]
  );

  // Component render từng dòng của FlatList
  const renderItem = ({ item }) => (
    <ActivityItem item={item} onToggleJoin={handleToggleJoin} />
  );

  // Component hiển thị khi danh sách rỗng (Empty State - R06)
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
        Không tìm thấy hoạt động nào
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Thử đổi từ khóa tìm kiếm hoặc chọn danh mục khác.
      </Text>
      {(searchQuery !== '' || selectedCategory !== 'Tất cả') && (
        <TouchableOpacity
          onPress={() => {
            setSearchQuery('');
            setSelectedCategory('Tất cả');
          }}
          style={[styles.resetFilterButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.resetFilterText}>Đặt lại bộ lọc</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScreenContainer edges={['left', 'right']}>
      {/* Search Input Header */}
      <View style={styles.searchSection}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Tìm kiếm hoạt động, workshop..."
            placeholderTextColor={colors.textMuted}
            style={[styles.searchInput, { color: colors.textPrimary }]}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={[styles.clearSearch, { color: colors.textMuted }]}>Xóa</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Categories Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {ACTIVITY_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryChip,
                  isSelected
                    ? { backgroundColor: colors.primary }
                    : {
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.cardBorder,
                        borderWidth: 1,
                      },
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    { color: isSelected ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Stats banner */}
        <View style={styles.statsRow}>
          <Text style={[styles.statsText, { color: colors.textSecondary }]}>
            Hiển thị: <Text style={{ fontWeight: '700' }}>{filteredActivities.length}</Text> / {activities.length} hoạt động
          </Text>
          <Text style={[styles.statsBadge, { color: colors.success }]}>
            Đã tham gia: {joinedCount}
          </Text>
        </View>
      </View>

      {/* FlatList Collection - R06 */}
      <FlatList
        data={filteredActivities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  clearSearch: {
    fontSize: 12,
    paddingHorizontal: 6,
    fontWeight: '600',
  },
  categoryScroll: {
    paddingBottom: 8,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 6,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  statsText: {
    fontSize: 12,
  },
  statsBadge: {
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 18,
  },
  resetFilterButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetFilterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
