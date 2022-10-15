import CommonLayout from "../../components/common-layout"
import styles from './index.module.scss'


const UserProfilePage = () => {
    return (
        <CommonLayout className={styles.page}>
            <div>
                <h1>User Profile</h1>
            </div>
        </CommonLayout>
    )
}

export default UserProfilePage