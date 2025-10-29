'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  EditOutlined,
  UserOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  BellOutlined,
  LockOutlined,
  LogoutOutlined,
  UploadOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Spin, message as antMessage, Upload, Form, Input, InputNumber, Select } from 'antd';
import styles from './page.module.css';

const { TextArea } = Input;

const categoryOptions = [
  { value: "ორეული", label: "ორეული" },
  { value: "კაბა", label: "კაბა" },
  { value: "შარვალი", label: "შარვალი" },
  { value: "პერანგი", label: "პერანგი" },
  { value: "ქვედაბოლო", label: "ქვედაბოლო" },
  { value: "პალტო", label: "პალტო" },
  { value: "ქურთუკი", label: "ქურთუკი" },
  { value: "მაისური", label: "მაისური" },
  { value: "პიჯაკი", label: "პიჯაკი" },
  { value: "ფრენჩი", label: "ფრენჩი" },
];

const sizeOptions = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

interface UserProfile {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout: authLogout } = useAuth();

  const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'addresses' | 'notifications' | 'password' | 'upload'>('profile');
  const [form, setForm] = useState<UserProfile>({ username: '', firstName: '', lastName: '', email: '', phone: '' });
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingField, setEditingField] = useState<keyof UserProfile | null>(null);

  const [fileList, setFileList] = useState<any[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [productForm] = Form.useForm();

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      setIsFetching(true);
      try {
        const res = await axios.get('http://localhost:3001/api/users/profile', { headers: { Authorization: `Bearer ${token}` } });
        if (res.data) {
          setForm({
            username: res.data.username || '',
            firstName: res.data.firstName || '',
            lastName: res.data.lastName || '',
            email: res.data.email || '',
            phone: res.data.phone || '',
            role: res.data.role || '',
          });
        }
      } catch (err: any) {
        console.error(err);
        antMessage.error('პროფილის მიღების შეცდომა');
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setIsSaving(true);
    try {
      await axios.put('http://localhost:3001/api/users/profile', { ...form }, { headers: { Authorization: `Bearer ${token}` } });
      antMessage.success('პროფილი წარმატებით განახლდა!');
      setEditingField(null);
    } catch (err: any) {
      antMessage.error(err.response?.data?.error || 'შენახვის შეცდომა');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    authLogout();
    router.push('/');
  };

  const handleProductSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("category", values.category);

    const sizes = Array.isArray(values.sizes) ? values.sizes : [values.sizes];
    sizes.forEach((size: string) => formData.append("sizes", size));

    fileList.forEach((file) => formData.append("images", file.originFileObj));

    if (mainImageIndex !== null && fileList[mainImageIndex]) {
      formData.append("mainImageIndex", mainImageIndex.toString());
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to create product");
      await res.json();
      antMessage.success("პროდუქტი წარმატებით დაემატა!");
      setFileList([]);
      setMainImageIndex(null);
      productForm.resetFields();
    } catch (err) {
      console.error(err);
      antMessage.error("პროდუქტის დამატება ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const fieldLabels: Record<keyof UserProfile, string> = {
    username: 'მომხმარებლის სახელი',
    firstName: 'სახელი',
    lastName: 'გვარი',
    email: 'ელფოსტა',
    phone: 'მობილურის ნომერი',
    role: ''
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h2 className={styles.title}>გამარჯობა, {user.username}</h2>
          <ul className={styles.menu}>
            <li className={`${styles.menuItem} ${activeSection === 'profile' ? styles.active : ''}`} onClick={() => setActiveSection('profile')}><UserOutlined className={styles.icon} /> პროფილი</li>
            <li className={`${styles.menuItem} ${activeSection === 'orders' ? styles.active : ''}`} onClick={() => setActiveSection('orders')}><ShoppingOutlined className={styles.icon} /> შეკვეთები</li>
            <li className={`${styles.menuItem} ${activeSection === 'addresses' ? styles.active : ''}`} onClick={() => setActiveSection('addresses')}><EnvironmentOutlined className={styles.icon} /> მისამართები</li>
            <li className={`${styles.menuItem} ${activeSection === 'notifications' ? styles.active : ''}`} onClick={() => setActiveSection('notifications')}><BellOutlined className={styles.icon} /> შეტყობინებები</li>
            <li className={`${styles.menuItem} ${activeSection === 'password' ? styles.active : ''}`} onClick={() => setActiveSection('password')}><LockOutlined className={styles.icon} /> პაროლი</li>
            {user.role === 'admin' && (
              <li className={`${styles.menuItem} ${activeSection === 'upload' ? styles.active : ''}`} onClick={() => setActiveSection('upload')}><UploadOutlined className={styles.icon} /> პროდუქტის დამატება</li>
            )}
            <li className={`${styles.menuItem} ${styles.logout}`} onClick={handleLogout}><LogoutOutlined className={styles.icon} /> გასვლა</li>
          </ul>
        </aside>

        {/* Profile Section */}
        <section className={styles.profileSection} style={{ display: activeSection === 'profile' ? 'block' : 'none' }}>
          <h2 className={styles.sectionTitle}>პროფილის რედაქტირება</h2>
          {isFetching ? (
            <div className={styles.loading}><Spin size="large" /></div>
          ) : (
            <div className={styles.form}>
              {(['username', 'firstName', 'lastName', 'email', 'phone'] as (keyof UserProfile)[]).map((field) => (
                <div className={styles.inputGroup} key={field}>
                  <label>{fieldLabels[field]}</label>
                  <div className={styles.input}>
                    <Input
                      value={form[field] || ''}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      disabled={editingField !== field}
                      className={styles.inputField}
                    />
                    <EditOutlined className={styles.editIcon} onClick={() => setEditingField(editingField === field ? null : field)} />
                  </div>
                </div>
              ))}
              <button className={styles.saveBtn} onClick={handleSave}>შენახვა</button>
            </div>
          )}
        </section>

        {/* Admin Upload Section */}
        {user.role === 'admin' && (
          <section className={styles.profileSection} style={{ display: activeSection === 'upload' ? 'block' : 'none' }}>
            <h2 className={styles.sectionTitle}>პროდუქტის დამატება</h2>

            <Form form={productForm} layout="vertical" onFinish={handleProductSubmit} style={{ maxWidth: "100%", marginTop: 26 }}>
              <Form.Item label="დასახელება" name="name" rules={[{ required: true }]}><Input /></Form.Item>
              <Form.Item label="აღწერა" name="description" rules={[{ required: true }]}><TextArea rows={4} /></Form.Item>
              <Form.Item label="ფასი" name="price" rules={[{ required: true }]}><InputNumber min={0} style={{ width: "100%" }} /></Form.Item>
              <Form.Item label="კატეგორია" name="category" rules={[{ required: true }]}><Select options={categoryOptions} placeholder="აირჩიეთ კატეგორია" /></Form.Item>
              <Form.Item label="ზომები" name="sizes" rules={[{ required: true, message: "მიუთითეთ მინიმუმ ერთი ზომა" }]}><Select mode="multiple" options={sizeOptions} placeholder="აირჩიეთ ზომები" maxTagCount="responsive" /></Form.Item>

              {/* სურათები + მთავარი ფოტოს არჩევა */}
              <Form.Item label="ფოტოები" name="images">
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={({ fileList: newFileList }) => {
                    setFileList(newFileList);
                    if (mainImageIndex !== null && mainImageIndex >= newFileList.length) setMainImageIndex(null);
                  }}
                  multiple
                  itemRender={(originNode, file, files) => {
                    const index = files.findIndex(f => f.uid === file.uid);
                    return (
                      <div style={{ position: 'relative' }}>
                        {originNode}
                        <StarFilled
                          onClick={() => setMainImageIndex(index)}
                          style={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            color: mainImageIndex === index ? '#fadb14' : '#999',
                            fontSize: 18,
                            cursor: 'pointer',
                          }}
                          title="აირჩიე მთავარი ფოტო"
                        />
                      </div>
                    );
                  }}
                >
                  {fileList.length >= 8 ? null : (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>ატვირთვა</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item>
                <button className={styles.saveBtn} style={{ width: '100%' }} type="submit">{loading ? 'ატვირთვა...' : 'დამატება'}</button>
              </Form.Item>
            </Form>
          </section>
        )}
      </div>
    </div>
  );
}
