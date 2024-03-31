import { Button, List, Popconfirm, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export type ListItemProps = {
  onEditClick: () => void
  onRemoveClick: () => void
  onTitleClick: () => void
  title: string
  description: string
};

export const ListItem = ({ onEditClick, onRemoveClick, title, onTitleClick, description }: ListItemProps) => {
  return (
    <List.Item
      actions={[
        <Button
          key={'edit'}
          type="text"
          link
          onClick={onEditClick}
        >
                    Редактировать
        </Button>,
        <Popconfirm
          key={'remove'}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          title="Удаление события"
          description="Вы уверенны, что хотите удалить событие?"
          okText="Да"
          cancelText="Нет"
          onConfirm={onRemoveClick}
        >
          <Button
            type="text"
            danger
          >
                        Удалить
          </Button>
        </Popconfirm>
      ]}
    >

      <List.Item.Meta

        title={<Typography.Link onClick={onTitleClick}>{title}</Typography.Link>}
        description={description}
      />

    </List.Item>
  );
};
