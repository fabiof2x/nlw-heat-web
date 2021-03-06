import { useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { api } from '../../services/api';
import styles from './styles.module.scss';
import { useAuth } from '../../contexts/auth';

export function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [isSendingMessage, setIsSendingMessage] = useState(false)

  const { user, signOut } = useAuth()

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault()

    if (!message.trim()) {
      return;
    }

    setIsSendingMessage(true)

    try {
      await api.post('messages', {
        message,
      })

      setMessage('');
    } finally {
      setIsSendingMessage(false)
    }
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.signedUserInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form
        onSubmit={handleSendMessage}
        className={styles.sendMessageForm}
      >
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={event => setMessage(event.target.value)}
          value={message}
        />

        <button
          disabled={isSendingMessage}
          type="submit"
        >
          Enviar mensagem
        </button>
      </form>
    </div>
  )
}